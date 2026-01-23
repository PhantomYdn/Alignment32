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
            getLabelClasses(index)
          ]"
        >
          {{ step.name }}
        </span>
      </div>
      
      <!-- Connector line (not after last step) - vertically centered -->
      <div 
        v-if="index < steps.length - 1"
        class="flex items-center h-8 sm:h-10"
      >
        <div 
          class="w-6 sm:w-10 md:w-16 h-0.5 mx-1 sm:mx-2 rounded-full bg-gray-200 transition-all duration-500"
        ></div>
      </div>
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
  data() {
    return {
      stepColors: {
        Physical: {
          bg: 'bg-physical-500',
          ring: 'ring-physical-200',
          text: 'text-physical-600'
        },
        Mental: {
          bg: 'bg-mental-500',
          ring: 'ring-mental-200',
          text: 'text-mental-600'
        },
        Emotional: {
          bg: 'bg-emotional-500',
          ring: 'ring-emotional-200',
          text: 'text-emotional-600'
        },
        Spiritual: {
          bg: 'bg-spiritual-500',
          ring: 'ring-spiritual-200',
          text: 'text-spiritual-600'
        },
        Review: {
          bg: 'bg-review-500',
          ring: 'ring-review-200',
          text: 'text-review-600'
        }
      }
    }
  },
  methods: {
    getStepColor(index) {
      const stepName = this.steps[index]?.name
      return this.stepColors[stepName] || {
        bg: 'bg-gray-500',
        ring: 'ring-gray-200',
        text: 'text-gray-600'
      }
    },
    getStepClasses(index) {
      const colors = this.getStepColor(index)
      
      if (index < this.currentStep) {
        // Completed step - use category color
        return `${colors.bg} text-white shadow-md`
      } else if (index === this.currentStep) {
        // Current step - use category color with ring
        return `${colors.bg} text-white shadow-lg ring-4 ${colors.ring}`
      } else {
        // Future step - gray
        return 'bg-gray-200 text-gray-400'
      }
    },
    getLabelClasses(index) {
      const colors = this.getStepColor(index)
      
      if (index < this.currentStep) {
        // Completed - category color
        return colors.text
      } else if (index === this.currentStep) {
        // Current - darker text
        return 'text-gray-800'
      } else {
        // Future - gray
        return 'text-gray-400'
      }
    }
  }
}
</script>
