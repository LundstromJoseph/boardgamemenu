<script lang="ts">
	import { preventDefault, stopPropagation } from 'svelte/legacy';

	import { COLORS } from '../theme/colors'
	import type { Range } from '../types/boardgames'

	interface Props {
		min?: number;
		max?: number;
		stepSize?: number;
		range?: Range;
		onEnd?: (range: Range) => void;
		accentColor?: string;
	}

	let {
		min = 0,
		max = 10,
		stepSize = 1,
		range = $bindable([min, max]),
		onEnd = () => undefined,
		accentColor = COLORS.TEXT_COLOR
	}: Props = $props();


	let fill: HTMLDivElement = $state()
	let slider: HTMLDivElement = $state()

	function precision(a: number) {
		if (!isFinite(a)) return 0
		var e = 1,
			p = 0
		while (Math.round(a * e) / e !== a) {
			e *= 10
			p++
		}
		return p
	}

	const toPercentage = (value: number) => {
		return (value - min) / (max - min)
	}

	function calculateNewValues(variant: 'left' | 'right', clientX: number) {
		const sliderRect = slider?.getBoundingClientRect()

		if (sliderRect) {
			const sliderStart = sliderRect.left
			const sliderEnd = sliderRect.left + sliderRect.width

			const percentageMoved = (clientX - sliderStart) / (sliderEnd - sliderStart)

			const target = min + (max - min) * percentageMoved
			const newValue = Number((Math.round(target / stepSize) * stepSize).toFixed(decimals))

			if (variant === 'left') {
				const clampedValue = clamp(newValue, min, max)
				range = [clamp(newValue, min, max), Math.max(clampedValue, range[1])]
			}
			if (variant === 'right') {
				const clampedValue = clamp(newValue, min, max)
				range = [Math.min(range[0], clampedValue), clamp(newValue, min, max)]
			}
		}
	}

	function onMouseDown(variant: 'left' | 'right') {
		return function () {
			const mouseMoveListener = (mouseEvent: MouseEvent) => {
				calculateNewValues(variant, mouseEvent.x)
			}

			const mouseUpListener = () => {
				onEnd(range)
				window.removeEventListener('mousemove', mouseMoveListener)
				window.removeEventListener('mouseup', mouseUpListener)
			}

			window.addEventListener('mouseup', mouseUpListener)
			window.addEventListener('mousemove', mouseMoveListener)
		}
	}

	function clamp(value: number, min: number, max: number) {
		return Math.min(Math.max(value, min), max)
	}

	function onTouchMove(variant: 'left' | 'right') {
		return function (e: TouchEvent) {
			const touch = e.touches.item(0)

			if (touch) {
				calculateNewValues(variant, touch.clientX)
			}
		}
	}
	let decimals = $derived(precision(stepSize))
</script>

<div class="container">
	<div class="slider" style="--background-color: {COLORS.ON_SURFACE_BACKGROUND}" bind:this={slider}>
		<div
			class="fill"
			bind:this={fill}
			style="
        left: {100 * toPercentage(range[0])}%;
        right: {100 * (1 - toPercentage(range[1]))}%;
				--background-color: {accentColor};
      "
		></div>
		<div
			class="handle"
			onmousedown={stopPropagation(preventDefault(onMouseDown('left')))}
			ontouchmove={stopPropagation(preventDefault(onTouchMove('left')))}
			ontouchend={stopPropagation(preventDefault(() => onEnd(range)))}
			style="
        left: {100 * toPercentage(range[0])}%;
				--background-color: {COLORS.ON_SURFACE_BUTTON};
				--border-color: {COLORS.ON_SURFACE_BACKGROUND};
      "
		></div>
		<div
			class="handle"
			style="
        left: {100 * toPercentage(range[1])}%;
				--background-color: {COLORS.ON_SURFACE_BUTTON};
				--border-color: {COLORS.ON_SURFACE_BACKGROUND};
      "
			onmousedown={stopPropagation(preventDefault(onMouseDown('right')))}
			ontouchmove={stopPropagation(preventDefault(onTouchMove('right')))}
			ontouchend={stopPropagation(preventDefault(() => onEnd(range)))}
		></div>
	</div>
</div>

<style>
	.container {
		width: 100%;
		height: 36px;
		user-select: none;
		white-space: nowrap;
	}
	.slider {
		position: relative;
		width: 100%;
		height: 24px;
		top: 6px;
		background-color: var(--background-color);
		border-radius: 12px;
	}
	.handle {
		position: absolute;
		top: 50%;
		width: 36px;
		height: 36px;
		background-color: var(--background-color);
		border: 1px solid var(--border-color);
		border-radius: 50%;
		transform: translate(-50%, -50%);
	}

	.fill {
		top: 0;
		position: absolute;
		background-color: var(--background-color);
		bottom: 0;
	}
</style>
