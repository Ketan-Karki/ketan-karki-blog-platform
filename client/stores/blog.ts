import { defineStore } from "pinia";
import { ref } from "vue";
import { useRuntimeConfig } from "nuxt/app";

export const useBlogStore = defineStore("blog", () => {
  const posts = ref<any[]>([]);
  const currentPost = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const fetchPosts = async () => {
    loading.value = true;
    error.value = null;
    try {
      const config = useRuntimeConfig();
      const response = await fetch(`${config.public.apiBase}/api/posts`);
      const { data } = await response.json();
      posts.value = data;
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const fetchPost = async (slug: string) => {
    loading.value = true;
    error.value = null;
    try {
      const config = useRuntimeConfig();
      const response = await fetch(
        `${config.public.apiBase}/api/posts/${slug}`
      );
      const { data } = await response.json();
      currentPost.value = data;
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  return {
    posts,
    currentPost,
    loading,
    error,
    fetchPosts,
    fetchPost,
  };
});
