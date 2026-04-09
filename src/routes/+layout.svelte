<script>
	import favicon from '$lib/assets/favicon.svg';
	import './style/app.css';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Gallery</title>
</svelte:head>

{@render children()}
