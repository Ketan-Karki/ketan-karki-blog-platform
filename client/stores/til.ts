import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { format, parseISO } from 'date-fns';

export interface TIL {
  id: string;
  title: string;
  content: string;
  category?: string;
  source?: string;
  createdAt: string;
  updatedAt: string;
}

export const useTILStore = defineStore('til', () => {
  const tils = ref<TIL[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const selectedTIL = ref<TIL | null>(null);

  // Computed properties
  const categories = computed(() => {
    const uniqueCategories = new Set<string>();
    tils.value.forEach(til => {
      if (til.category) {
        uniqueCategories.add(til.category);
      }
    });
    return Array.from(uniqueCategories).sort();
  });

  // Actions
  async function fetchTILs() {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch('/api/til');
      const data = await response.json();

      if (data.success) {
        tils.value = data.tils;
      } else {
        throw new Error(data.message || 'Failed to fetch TILs');
      }
    } catch (err) {
      error.value = err.message || 'An error occurred while fetching TILs';
      console.error('Error fetching TILs:', err);
    } finally {
      loading.value = false;
    }
  }

  async function fetchTILById(id: string) {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch(`/api/til/${id}`);
      const data = await response.json();

      if (data.success) {
        selectedTIL.value = data.til;
        return data.til;
      } else {
        throw new Error(data.message || 'Failed to fetch TIL');
      }
    } catch (err) {
      error.value = err.message || 'An error occurred while fetching TIL';
      console.error('Error fetching TIL:', err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  async function fetchTILsByCategory(category: string) {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch(`/api/til/category/${encodeURIComponent(category)}`);
      const data = await response.json();

      if (data.success) {
        tils.value = data.tils;
      } else {
        throw new Error(data.message || 'Failed to fetch TILs by category');
      }
    } catch (err) {
      error.value = err.message || 'An error occurred while fetching TILs by category';
      console.error('Error fetching TILs by category:', err);
    } finally {
      loading.value = false;
    }
  }

  function selectTIL(til: TIL) {
    selectedTIL.value = til;
  }

  function clearSelectedTIL() {
    selectedTIL.value = null;
  }

  function formatDate(dateString: string) {
    try {
      return format(parseISO(dateString), 'MMMM d, yyyy');
    } catch (err) {
      console.error('Error formatting date:', err);
      return dateString;
    }
  }

  return {
    tils,
    loading,
    error,
    selectedTIL,
    categories,
    fetchTILs,
    fetchTILById,
    fetchTILsByCategory,
    selectTIL,
    clearSelectedTIL,
    formatDate
  };
});
