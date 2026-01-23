<template>
  <div class="flex items-center justify-center gap-1 sm:gap-2 py-3 sm:py-4">
    <div 
      v-for="(step, index) in steps" 
      :key="step.name"
      class="flex items-center"
    >
      <!-- Step circle and label -->
      <div class="flex flex-col items-center">
        <!-- Circle indicator -->
        <div 
          :class="[
            'w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-300',
            getStepClasses(index)
          ]"
        >
          <!-- Checkmark for completed -->
          <svg 
            v-if="index < currentStep" 
            class="w-4 h-4 sm:w-5 sm:h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
          </svg>
          <!-- Number for current and future -->
          <span v-else>{{ index + 1 }}</span>
        </div>
        
        <!-- Step label (hidden on very small screens) -->
        <span 
          :class="[
            'text-xs mt-1.5 font-medium transition-colors duration-300 hidden sm:block',
            index === currentStep ? 'text-gray-800' : 
            index < currentStep ? 'text-green-600' : 'text-gray-400'
          ]"
        >
          {{ step.name }}
        </span>
      </div>
      
      <!-- Connector line (not after last step) -->
      <div 
        v-if="index < steps.length - 1"
        :class="[
          'w-6 sm:w-10 md:w-16 h-1 mx-1 sm:mx-2 rounded-full transition-all duration-500',
          index < currentStep ? 'bg-green-500' : 'bg-gray-200'
        ]"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StepIndicator',
  props: {
    steps: {
      type: Array,
      required: true,
      validator: (steps) => steps.every(s => s.name)
    },
    currentStep: {
      type: Number,
      required: true
    }
  },
  methods: {
    getStepClasses(index) {
      if (index < this.currentStep) {
        // Completed step
        return 'bg-green-500 text-white shadow-md'
      } else if (index === this.currentStep) {
        // Current step
        return 'bg-indigo-600 text-white shadow-lg ring-4 ring-indigo-200'
      } else {
        // Future step
        return 'bg-gray-200 text-gray-400'
      }
    }
  }
}
</script>
