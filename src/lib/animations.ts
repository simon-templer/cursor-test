// Animation utility functions and constants

export const ANIMATION_DELAYS = {
  STAGGERED: 150, // ms between each card animation
  SUB_ELEMENT: 50, // ms between sub-elements (like tech tags)
} as const;

export const ANIMATION_DURATIONS = {
  FAST: 200,
  MEDIUM: 300,
  SLOW: 500,
  VERY_SLOW: 700,
} as const;

// Common animation class combinations
export const ANIMATION_CLASSES = {
  // Base card animations
  CARD_ENTER: 'opacity-0 transform translate-y-8',
  CARD_ENTERED: 'opacity-100 translate-y-0',
  
  // Hover effects
  HOVER_SCALE: 'hover:scale-[1.02]',
  HOVER_SHADOW: 'hover:shadow-xl',
  HOVER_BORDER: 'hover:border-primary/20',
  
  // Transitions
  TRANSITION_ALL: 'transition-all duration-700 ease-out',
  TRANSITION_COLORS: 'transition-colors duration-300',
  TRANSITION_OPACITY: 'transition-opacity duration-500',
  TRANSITION_TRANSFORM: 'transition-transform duration-300',
  
  // Group hover effects
  GROUP_HOVER_TEXT: 'group-hover:text-primary',
  GROUP_HOVER_SCALE: 'group-hover:scale-105',
  GROUP_HOVER_OPACITY: 'group-hover:opacity-100',
} as const;

// Animation configuration presets
export const ANIMATION_PRESETS = {
  CARD: {
    enter: ANIMATION_CLASSES.CARD_ENTER,
    entered: ANIMATION_CLASSES.CARD_ENTERED,
    hover: `${ANIMATION_CLASSES.HOVER_SCALE} ${ANIMATION_CLASSES.HOVER_SHADOW} ${ANIMATION_CLASSES.HOVER_BORDER}`,
    transition: ANIMATION_CLASSES.TRANSITION_ALL,
  },
  TEXT: {
    hover: ANIMATION_CLASSES.GROUP_HOVER_TEXT,
    transition: ANIMATION_CLASSES.TRANSITION_COLORS,
  },
  ELEMENT: {
    hover: ANIMATION_CLASSES.GROUP_HOVER_SCALE,
    transition: ANIMATION_CLASSES.TRANSITION_TRANSFORM,
  },
} as const;

// Utility function to calculate staggered delays
export function getStaggeredDelay(index: number, baseDelay: number = ANIMATION_DELAYS.STAGGERED): number {
  return index * baseDelay;
}

// Utility function to calculate sub-element delays
export function getSubElementDelay(
  parentIndex: number, 
  elementIndex: number, 
  baseDelay: number = ANIMATION_DELAYS.STAGGERED,
  subDelay: number = ANIMATION_DELAYS.SUB_ELEMENT
): number {
  return (parentIndex * baseDelay) + (elementIndex * subDelay);
} 