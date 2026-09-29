import type { Directive } from 'vue'

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed')
        observer.unobserve(entry.target)
      }
    }
  },
  { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
)

// v-reveal : anime un élément en fondu + léger décalage vers le haut quand il
// entre dans le viewport. v-reveal="i" ajoute un délai en cascade (i * 70ms).
export const vReveal: Directive<HTMLElement, number | undefined> = {
  mounted(el, binding) {
    el.classList.add('reveal')
    if (typeof binding.value === 'number') {
      el.style.transitionDelay = `${Math.min(binding.value, 8) * 70}ms`
    }
    observer.observe(el)
  },
  unmounted(el) {
    observer.unobserve(el)
  },
}
