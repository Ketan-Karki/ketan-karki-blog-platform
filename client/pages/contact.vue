<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <Header />
    
    <main class="flex-grow max-w-6xl mx-auto px-4 py-8 w-full">
      <div class="bg-white shadow-md rounded-lg p-8 max-w-2xl mx-auto">
        <h1 class="text-3xl font-bold text-gray-900 mb-6">Contact Me</h1>
        
        <p class="text-gray-600 mb-8">
          Have a question, suggestion, or just want to say hello? Fill out the form below and I'll get back to you as soon as possible.
        </p>
        
        <form @submit.prevent="submitForm" class="space-y-6">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input 
              type="text" 
              id="name" 
              v-model="form.name" 
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              required
            >
          </div>
          
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              id="email" 
              v-model="form.email" 
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              required
            >
          </div>
          
          <div>
            <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea 
              id="message" 
              v-model="form.message" 
              rows="5" 
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              required
            ></textarea>
          </div>
          
          <div>
            <button 
              type="submit" 
              class="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition"
              :disabled="submitting"
            >
              {{ submitting ? 'Sending...' : 'Send Message' }}
            </button>
          </div>
          
          <div v-if="formStatus" :class="[formStatus.type === 'success' ? 'text-green-600' : 'text-red-600', 'text-center']">
            {{ formStatus.message }}
          </div>
        </form>
      </div>
    </main>
    
    <Footer />
  </div>
</template>

<script setup>
const form = ref({
  name: '',
  email: '',
  message: ''
})

const submitting = ref(false)
const formStatus = ref(null)

const submitForm = async () => {
  submitting.value = true
  formStatus.value = null
  
  try {
    // In a real application, you would send the form data to your API
    // const response = await fetch('your-api-endpoint', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(form.value)
    // })
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Reset form
    form.value = {
      name: '',
      email: '',
      message: ''
    }
    
    formStatus.value = {
      type: 'success',
      message: 'Your message has been sent successfully! I will get back to you soon.'
    }
  } catch (error) {
    console.error('Error submitting form:', error)
    formStatus.value = {
      type: 'error',
      message: 'There was an error sending your message. Please try again later.'
    }
  } finally {
    submitting.value = false
  }
}

useHead({
  title: 'Contact - Slow Down Time',
  meta: [
    { name: 'description', content: 'Get in touch with the author of Slow Down Time blog.' }
  ]
})
</script>
