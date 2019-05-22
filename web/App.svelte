<script>
	export let copy;
	export let words;
	export let sort;
	export let emoji;
	export let filteredEmoji = [];
	export let copyTooltipText = "Copy";

	// Keep immutable version of words in memory
	export let wordsImm = Array.from(words);

	// Disable tooltips on mobile
	export let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

	function copyToClipboard(e) {
		copyTooltipText = "Copied to clipboard!"
		copy(e.target.innerText);
		setTimeout(() => {
			copyTooltipText = "Copy"
		}, 1000)
	}

	function filterAndSort() {
		let wordsMut = Array.from(wordsImm);

		if (filteredEmoji.length > 0) {
			filteredEmoji.forEach(emoji => {
				wordsMut = wordsMut.filter(word => !word.includes(emoji));
			});
		}

		if (sort === 'length') {
			words = wordsMut.sort((a,b) => b.length - a.length);
		} else {
			words = wordsMut;
		}
	}

	function handleSortClick(e) {
		const { value } = e.target;

		if (value !== sort) {
			sort = value;
		}

		filterAndSort();
	}

	function handleFilterClick(e) {
		const { checked, value } = e.target;

		if (checked) {
			filteredEmoji.splice(filteredEmoji.indexOf(value), 1);
		} else {
			filteredEmoji.push(value);
		}

		filterAndSort();
	}

	function allEmoji() {
		filteredEmoji = emoji;
		filterAndSort();
	}

	function resetFilters() {
		filteredEmoji = [];
		words = Array.from(wordsImm);
	}
</script>

<style>
	h1 {
		margin-top: 20px;
	}
	footer {
		text-align: center;
	}
	a {
		cursor: pointer;
	}
	ul {
		display: flex;
		flex-wrap: wrap;
		list-style-type: none;
		margin-top: 30px;
	}
	li {
		margin: 2px;
	}
	label {
		cursor: pointer;
		display: inline-flex;
		height: 30px;
		align-items: center;
	}
	label.form-checkbox {
		margin-right: 6px;
	}
	footer {
		margin-top: 80px;
	}
</style>

<div class="container">
	<div class="columns">
		<div class="column col-1" />
		<div class="column col-10">
			<div class="hero hero-sm">
				<h1>Emoji Dictionary</h1>
				<p>A complete list of English words that can be written entirely with emoji. Because.</p>
			</div>
			<div class="form-group">
				Listing {words.length} words:
				<label class="form-radio form-inline">
					<input on:change={handleSortClick} type="radio" name="sort" value="default" checked>
					<i class="form-icon"></i>
					<span>alphabetically</span>
				</label>
				<label class="form-radio form-inline">
					<input on:change={handleSortClick} type="radio" name="sort" value="length">
					<i class="form-icon"></i>
					<span>by length.</span>
				</label>
				<br>
				Filter:
				<a on:click={resetFilters}>All</a>
				<a on:click={allEmoji}>None</a>
				{#each emoji as moji}
					<label class="form-checkbox form-inline">
						<input on:change={handleFilterClick} type="checkbox" checked={!filteredEmoji.includes(moji)} value={moji}>
						<i class="form-icon"></i>
						<span>{moji}</span>
					</label>
				{/each}
			</div>
		</div>
		<div class="column col-1" />
		<div class="column col-2 col-md-1" />
		<div class="column col-8 col-md-10 col-sm-12">
		<ul>
			{#if words.length == 0}
				<div class="empty column col-12">
					<div class="empty-icon">
						<i class="icon icon-people"></i>
					</div>
					<p class="empty-title h5">No words match the set emoji.</p>
					<p class="empty-subtitle">Enable some more, ya dingus!</p>
					<div class="empty-action">
						<button class="btn btn-primary" on:click={resetFilters}>Reset</button>
					</div>
				</div>
			{:else}
				{#each words as word}
					<li>
						{#if isMobile}
							<div class="btn btn-lg tooltip">
								<p class="h4" on:click={copyToClipboard}>
									{word}
								</p>
							</div>
						{:else}
							<div class="btn btn-lg tooltip" data-tooltip={copyTooltipText}>
								<p class="h4" on:click={copyToClipboard}>
									{word}
								</p>
							</div>
						{/if}
					</li>
				{/each}
			{/if}
		</ul>
		</div>
		<div class="column col-2 col-md-1" />
	</div>
	<footer>
		<p>
			Written with 💜 by <a href="https://bryce.io">bryce</a> in <a href="https://svelte.dev/">Svelte</a>. View <a href="https://gitlab.com/brycedorn/emoji-dict">source</a>.
		</p>
	</footer>
</div>