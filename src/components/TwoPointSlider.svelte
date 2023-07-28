<script lang="ts">
	import { COLORS } from '../theme/colors'
	import type { Range } from '../types/boardgames'

	export let min = 0
	export let max = 10
	export let stepSize = 1
	export let range: Range = [min, max]
	export let onEnd: (range: Range) => void = () => undefined
	export let accentColor: string = COLORS.TEXT_COLOR

	$: roundValue = 1.0 / stepSize

	let fill: HTMLDivElement
	let slider: HTMLDivElement

	const toPercentage = (value: number) => {
		return (value - min) / (max - min)
	}

	function calculateNewValues(variant: 'left' | 'right', clientX: number) {
		const sliderRect = slider?.getBoundingClientRect()

		if (sliderRect) {
			const sliderStart = sliderRect.left
			const sliderEnd = sliderRect.left + sliderRect.width

			const percentageMoved = (clientX - sliderStart) / (sliderEnd - sliderStart)

			const newValue = Math.round(percentageMoved * (max - min) * roundValue) / roundValue

			if (variant === 'left') {
				range = [clamp(newValue, min, range[1] - (max - min) * 0.1), range[1]]
			}
			if (variant === 'right') {
				range = [range[0], clamp(newValue, range[0] + (max - min) * 0.1, max)]
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
</script>

<div class="container">
	<div class="slider" style="--background-color: {COLORS.CONTROL_COLOR}" bind:this={slider}>
		<div
			class="fill"
			bind:this={fill}
			style="
        left: {100 * toPercentage(range[0])}%;
        right: {100 * (1 - toPercentage(range[1]))}%;
				--background-color: {accentColor};
      "
		/>
		<div
			class="handle"
			on:mousedown|preventDefault|stopPropagation={onMouseDown('left')}
			on:touchmove|preventDefault|stopPropagation={onTouchMove('left')}
			on:touchend|preventDefault|stopPropagation={() => onEnd(range)}
			style="
        left: {100 * toPercentage(range[0])}%;
				--background-color: {COLORS.SURFACE};
				--border-color: {COLORS.CONTROL_COLOR};
      "
		/>
		<div
			class="handle"
			style="
        left: {100 * toPercentage(range[1])}%;
				--background-color: {COLORS.SURFACE};
				--border-color: {COLORS.CONTROL_COLOR};
      "
			on:mousedown|preventDefault|stopPropagation={onMouseDown('right')}
			on:touchmove|preventDefault|stopPropagation={onTouchMove('right')}
			on:touchend|preventDefault|stopPropagation={() => onEnd(range)}
		/>
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
