import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "../../categories/category.entity";
import { Post } from "../../posts/post.entity";
import * as slug from "slug";

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    @InjectRepository(Post)
    private postsRepository: Repository<Post>
  ) {}

  async seedAll() {
    await this.seedCategories();
    await this.seedPosts();
    console.log("✅ Database seeded successfully!");
  }

  private async seedCategories() {
    const categories = [
      {
        name: "Technology",
        slug: "technology",
        description:
          "Posts about software development, programming, and tech trends",
      },
      {
        name: "Personal",
        slug: "personal",
        description: "Personal thoughts, experiences, and life updates",
      },
      {
        name: "Tutorials",
        slug: "tutorials",
        description: "Step-by-step guides and how-to articles",
      },
    ];

    for (const categoryData of categories) {
      const existing = await this.categoriesRepository.findOne({
        where: { slug: categoryData.slug },
      });

      if (!existing) {
        await this.categoriesRepository.save(categoryData);
      }
    }
  }

  private async seedPosts() {
    const techCategory = await this.categoriesRepository.findOne({
      where: { slug: "technology" },
    });
    const personalCategory = await this.categoriesRepository.findOne({
      where: { slug: "personal" },
    });

    const posts = [
      {
        title: "Welcome to Slow Down Time",
        slug: "welcome-to-slow-down-time",
        content: `# Welcome to My Personal Blog

This is my first post on Slow Down Time, a place where I'll be sharing my thoughts, experiences, and learnings as a full-stack developer.

## What You Can Expect

- Technical tutorials and insights
- Personal reflections on the development journey
- Tips and tricks I've learned along the way
- Project showcases and case studies

## About This Blog

This blog is built with:
- **Frontend**: Nuxt 3, TailwindCSS, and Pinia
- **Backend**: NestJS with PostgreSQL
- **Deployment**: SSH server deployment

I believe in the importance of documenting our journey as developers, not just for others to learn from, but also for our own growth and reflection.

Stay tuned for more content!`,
        excerpt:
          "Welcome to my personal blog where I share insights about development, life, and everything in between.",
        published: true,
        readTime: 2,
        publishedAt: new Date(),
        category: personalCategory,
      },
      {
        title: "Building a Full-Stack Blog with Nuxt 3 and NestJS",
        slug: "building-fullstack-blog-nuxt-nestjs",
        content: `# Building a Full-Stack Blog with Nuxt 3 and NestJS

Creating a personal blog is one of the best projects for a full-stack developer. It combines frontend and backend skills while creating something genuinely useful.

## Tech Stack Choice

### Frontend: Nuxt 3
- **Vue 3 Composition API**: Modern reactive framework
- **Auto-imports**: Less boilerplate code
- **Server-side rendering**: Better SEO and performance
- **File-based routing**: Intuitive navigation structure

### Backend: NestJS
- **TypeScript first**: Type safety throughout
- **Decorator-based**: Clean, readable code
- **Modular architecture**: Scalable project structure
- **Built-in validation**: Robust data handling

### Database: PostgreSQL
- **Reliable**: Battle-tested in production
- **Feature-rich**: Advanced querying capabilities
- **TypeORM integration**: Easy database operations

## Key Features Implemented

1. **Blog Post Management**
   - CRUD operations for posts
   - Category organization
   - Slug-based URLs

2. **Responsive Design**
   - TailwindCSS for styling
   - Mobile-first approach
   - Clean, professional layout

3. **State Management**
   - Pinia for client-side state
   - API integration
   - Error handling

## Deployment Strategy

The application is deployed on a private SSH server, providing:
- Full control over the environment
- Cost-effective hosting
- Learning opportunity for server management

This project showcases the complete development cycle from conception to deployment.`,
        excerpt:
          "A deep dive into building a modern full-stack blog application using Nuxt 3 and NestJS.",
        published: true,
        readTime: 8,
        publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        category: techCategory,
      },
      {
        title: "The Journey of a Full-Stack Developer",
        slug: "journey-fullstack-developer",
        content: `# The Journey of a Full-Stack Developer

Every developer's journey is unique, but there are common patterns and challenges we all face. Here's my perspective on what it means to be a full-stack developer in 2024.

## The Learning Never Stops

Technology moves fast. What worked yesterday might be outdated tomorrow. The key is to:

- **Stay curious**: Always be learning something new
- **Focus on fundamentals**: Core concepts remain relevant
- **Build projects**: Nothing beats hands-on experience
- **Share knowledge**: Teaching others reinforces your own learning

## Challenges We Face

### Decision Fatigue
With so many frameworks, libraries, and tools available, choosing the right stack can be overwhelming.

### Keeping Up with Changes
Frontend frameworks update frequently. Backend technologies evolve. Staying current is a full-time job in itself.

### Imposter Syndrome
The more you learn, the more you realize you don't know. This is normal and actually a sign of growth.

## My Approach

1. **Start with problems**: Choose technologies that solve real problems
2. **Build real projects**: Academic knowledge only goes so far
3. **Document everything**: Your future self will thank you
4. **Connect with others**: The development community is incredibly supportive

## Looking Forward

The future of web development is exciting:
- **AI integration**: Tools that augment our capabilities
- **Edge computing**: Faster, more distributed applications
- **Web3**: New paradigms for user ownership and privacy

What matters most is maintaining a growth mindset and enjoying the journey.`,
        excerpt:
          "Reflections on the challenges and rewards of being a full-stack developer in the modern tech landscape.",
        published: true,
        readTime: 5,
        publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        category: personalCategory,
      },
    ];

    for (const postData of posts) {
      const existing = await this.postsRepository.findOne({
        where: { slug: postData.slug },
      });

      if (!existing) {
        await this.postsRepository.save(postData);
      }
    }
  }
}
