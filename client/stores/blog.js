import { defineStore } from 'pinia'

export const useBlogStore = defineStore('blog', {
  state: () => ({
    posts: [],
    loading: false,
    error: null
  }),
  
  actions: {
    async fetchPosts(categorySlug = null) {
      this.loading = true
      this.error = null
      
      try {
        // Add debugging to see what's happening
        console.log('Fetching posts...')
        
        // Get API base URL from runtime config
        const config = useRuntimeConfig()
        
        // Build URL with optional category filter
        let url = `${config.public.apiBase}/posts`
        if (categorySlug) {
          url += `?category=${categorySlug}`
        }
        
        // Fetch posts from API
        const response = await fetch(url)
        
        // Check if the request was successful
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('Posts fetched:', data)
        
        // Store the posts in state
        this.posts = data
        return data
      } catch (error) {
        console.error('Error fetching posts:', error)
        this.error = `Failed to load posts: ${error.message}`
        return []
      } finally {
        this.loading = false
      }
    },
    
    async fetchPost(slug) {
      this.loading = true
      this.error = null
      
      try {
        // Get API base URL from runtime config
        const config = useRuntimeConfig()
        const response = await fetch(`${config.public.apiBase}/posts/${slug}`)
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }
        
        return await response.json()
      } catch (error) {
        console.error(`Error fetching post ${slug}:`, error)
        this.error = `Failed to load post: ${error.message}`
        return null
      } finally {
        this.loading = false
      }
    }
  }
})
