<script lang='ts'>
  import type { Snippet } from 'svelte'
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements'

  const { class: className, children, onclick, ...props }: { children: Snippet, onclick?: (event: MouseEvent) => void } & (HTMLButtonAttributes | HTMLAnchorAttributes) = $props()
</script>

{#if 'href' in props}
  <a href={props.href} class={['action', className]} onclick={onclick}>
    {@render children()}
  </a>
{:else}
  <button class={['action', className]} onclick={onclick}>
    {@render children()}
  </button>
{/if}
