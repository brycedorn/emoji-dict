<script>
	export let copy;
	export let words;
	export let sort;
	export let filters;
	export let selectedFilters = [];
	export let copyTooltipText = "Copy";

	// Keep immutable version of words in memory
	export let wordsImm = Array.from(words);

	function copyToClipboard(e) {
		e.preventDefault();

		copyTooltipText = "Copied to clipboard!"

		copy(e.target.innerText);

		setTimeout(() => {
			copyTooltipText = "Copy"
		}, 1000)
	}

	function handleSortClick(e) {
		let wordsMut = Array.from(wordsImm);

		const { value } = e.target;

		if (value !== sort) {
			sort = value;

			if (selectedFilters.length > 0) {
				selectedFilters.forEach(filter => {
					wordsMut = wordsMut.filter(w => !w.includes(filter));
				});
			}

			if (sort === 'length') {
				words = wordsMut.sort((a,b) => b.length - a.length);
			} else {
				words = wordsMut;
			}
		}
	}

	function handleFilterClick(e) {
		let wordsMut = Array.from(wordsImm);

		const { checked, value } = e.target;

		if (checked) {
			selectedFilters.splice(selectedFilters.indexOf(value), 1);
		} else {
			selectedFilters.push(value);
		}

		selectedFilters.forEach(filter => {
			wordsMut = wordsMut.filter(w => !w.includes(filter));
		});

		if (sort === 'length') {
			wordsMut = wordsMut.sort((a,b) => b.length - a.length);
		}

		words = wordsMut;
	}

	function resetFilters(e) {
		selectedFilters = [];
		words = Array.from(wordsImm);
	}
</script>

<style>
	footer {
		text-align: center;
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
				Sort:
				<label class="form-radio form-inline">
					<input on:change={handleSortClick} type="radio" name="sort" value="default" checked><i class="form-icon"></i> Alphabetical
				</label>
				<label class="form-radio form-inline">
					<input on:change={handleSortClick} type="radio" name="sort" value="length"><i class="form-icon"></i> Length
				</label>
				<br>
				Filter:
				{#each filters as filter}
					<label class="form-checkbox form-inline">
						<input on:change={handleFilterClick} type="checkbox" checked value={filter}>
						<i class="form-icon"></i>
						<span>{filter}</span>
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
					<p class="empty-title h5">No words match the set filters.</p>
					<p class="empty-subtitle">Get rid of some filters, ya dingus!</p>
					<div class="empty-action">
						<button class="btn btn-primary" on:click={resetFilters}>Reset</button>
					</div>
				</div>
			{:else}
				{#each words as word}
					<li>
						<div class="btn btn-lg tooltip" data-tooltip={copyTooltipText}>
							<p class="h4" on:click={copyToClipboard}>
								{word}
							</p>
						</div>
					</li>
				{/each}
			{/if}
		</ul>
		</div>
		<div class="column col-2 col-md-1" />
	</div>
	<footer>
		<p>
			Written with 💜 by <a href="https://bryce.io">bryce</a> in <a href="https://svelte.dev/">Svelte</a>. View <a href="https://gitlab.com/brycedorn/emoji_dict">source</a>.
		</p>
	</footer>
</div>