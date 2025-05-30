import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Post } from "../posts/post.entity";
import { Category } from "../categories/category.entity";
import * as slug from "slug";

@Injectable()
export class HashnodeService {
  private readonly logger = new Logger(HashnodeService.name);

  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>
  ) {}

  async fetchHashnodePost(url: string): Promise<any> {
    try {
      this.logger.log(`Fetching Hashnode post from URL: ${url}`);

      // Parse URL
      const urlObj = new URL(url);
      const hostname = urlObj.hostname;
      const pathname = urlObj.pathname;

      // Extract slug from pathname
      const pathParts = pathname.split("/").filter(Boolean);
      const postSlug = pathParts[pathParts.length - 1];

      if (!postSlug) {
        throw new Error("Could not extract post slug from URL");
      }
      this.logger.log(`Extracted post slug: ${postSlug}`);

      // Updated Hashnode GraphQL API endpoint
      const endpoint = "https://gql.hashnode.com";

      // Extract publication domain from hostname
      const publicationDomain = hostname;
      this.logger.log(`Using publication domain: ${publicationDomain}`);

      // Updated GraphQL query with correct field names
      const query = `
        query GetPost($slug: String!, $hostname: String!) {
          publication(host: $hostname) {
            post(slug: $slug) {
              title
              slug
              content {
                markdown
              }
              brief
              publishedAt
              readTimeInMinutes
              coverImage {
                url
              }
              tags {
                name
              }
            }
          }
        }
      `;

      const variables = {
        slug: postSlug,
        hostname: publicationDomain,
      };

      this.logger.log(
        `Sending GraphQL request with variables: ${JSON.stringify(variables)}`
      );

      // Make the API request
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      const data = await response.json();
      this.logger.debug(`API response: ${JSON.stringify(data)}`);

      if (!data?.data?.publication?.post) {
        this.logger.error(
          `Post not found. Full response: ${JSON.stringify(data)}`
        );
        throw new Error("Post not found");
      }

      return data.data.publication.post;
    } catch (error) {
      this.logger.error(`Failed to fetch Hashnode post: ${error.message}`);
      throw error;
    }
  }

  async importHashnodePost(url: string): Promise<Post> {
    try {
      // Fetch post from Hashnode
      const hashnodePost = await this.fetchHashnodePost(url);

      // Find or create a "Hashnode" category
      let hashnodeCategory = await this.categoriesRepository.findOne({
        where: { slug: "hashnode" },
      });

      if (!hashnodeCategory) {
        hashnodeCategory = await this.categoriesRepository.save({
          name: "Hashnode",
          slug: "hashnode",
          description: "Articles imported from my Hashnode blog",
        });
      }

      // Check if post already exists
      const existingPost = await this.postsRepository.findOne({
        where: { slug: hashnodePost.slug },
      });

      if (existingPost) {
        this.logger.log(
          `Post "${hashnodePost.title}" already exists, updating...`
        );

        // Update existing post
        existingPost.title = hashnodePost.title;
        existingPost.content = hashnodePost.content.markdown;
        existingPost.excerpt = hashnodePost.brief;
        existingPost.readTime = hashnodePost.readTimeInMinutes;
        existingPost.publishedAt = new Date(hashnodePost.publishedAt);
        existingPost.category = hashnodeCategory;

        return await this.postsRepository.save(existingPost);
      }

      // Create new post
      const newPost = this.postsRepository.create({
        title: hashnodePost.title,
        slug: hashnodePost.slug,
        content: hashnodePost.content.markdown,
        excerpt: hashnodePost.brief,
        published: true,
        readTime: hashnodePost.readTimeInMinutes,
        publishedAt: new Date(hashnodePost.publishedAt),
        category: hashnodeCategory,
      });

      const savedPost = await this.postsRepository.save(newPost);
      this.logger.log(`Successfully imported post: "${hashnodePost.title}"`);
      return savedPost;
    } catch (error) {
      this.logger.error(`Failed to import Hashnode post: ${error.message}`);
      throw error;
    }
  }
}
