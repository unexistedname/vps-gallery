<script>
    import Card from "./Card.svelte";
    import './style/filecontent.css';
    import { createEventDispatcher, onMount } from 'svelte';

  const dispatch = createEventDispatcher();

  function openViewer() {
    dispatch('open');
  }

    let items = $state([]);
  async function loadItems() {
  const res = await fetch("http://localhost:6767/dir");
  const data = await res.json();
  console.log(data);
  items = data;
}
  onMount(async () => {
    loadItems();
  })
</script>

<div class="border border-1 border-light rounded p-3 mt-4 mb-5 container-fluid" id="file-container">
  {#each items as item}
  <Card
    title={item.title}
    isFolder={item.isFolder}
  />
{/each}
</div>