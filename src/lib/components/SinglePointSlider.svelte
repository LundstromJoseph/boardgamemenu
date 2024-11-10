<script lang="ts">
	import { preventDefault, stopPropagation } from 'svelte/legacy'
	import { COLORS } from '../theme/colors'

	interface Props {
		min?: number
		max?: number
		stepSize?: number
		value?: number
		onEnd?: (value: number) => void
		accentColor?: string
	}

	let {
		min = 0,
		max = 10,
		stepSize = 1,
		value = $bindable(min),
		onEnd = () => undefined,
		accentColor = COLORS.TEXT_COLOR
	}: Props = $props()

	let slider: HTMLDivElement | undefined = $state()

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

	function clamp(value: number, min: number, max: number) {
		return Math.min(Math.max(value, min), max)
	}

	const toPercentage = (val: number) => {
		return (val - min) / (max - min)
	}

	function calculateNewValue(clientX: number) {
		const sliderRect = slider?.getBoundingClientRect()

		if (sliderRect) {
			const sliderStart = sliderRect.left
			const sliderEnd = sliderRect.left + sliderRect.width

			const percentageMoved = (clientX - sliderStart) / (sliderEnd - sliderStart)
			const target = min + (max - min) * percentageMoved
			const newValue = Number((Math.round(target / stepSize) * stepSize).toFixed(decimals))
			value = clamp(newValue, min, max)
		}
	}

	function onMouseDown() {
		return function () {
			const mouseMoveListener = (mouseEvent: MouseEvent) => {
				mouseEvent.stopPropagation()
				mouseEvent.preventDefault()
				calculateNewValue(mouseEvent.x)
			}

			const mouseUpListener = (event: MouseEvent) => {
				event.stopPropagation()
				event.preventDefault()
				onEnd(value)
				window.removeEventListener('mousemove', mouseMoveListener)
				window.removeEventListener('mouseup', mouseUpListener)
			}

			window.addEventListener('mouseup', mouseUpListener)
			window.addEventListener('mousemove', mouseMoveListener)
		}
	}

	function onTouchMove(e: TouchEvent) {
		const touch = e.touches.item(0)

		if (touch) {
			calculateNewValue(touch.clientX)
		}
	}

	let decimals = $derived(precision(stepSize))
</script>

<div class="container">
	<div class="slider" style="--background-color: {COLORS.ON_SURFACE_BACKGROUND}" bind:this={slider}>
		<div
			class="fill"
			style="
        width: {100 * toPercentage(value)}%;
				--background-color: {accentColor};
      ">
		</div>
		<div
			role="slider"
			aria-valuenow={value}
			tabindex={0}
			class="handle touch-none"
			onmousedown={stopPropagation(preventDefault(onMouseDown()))}
			ontouchmove={onTouchMove}
			ontouchend={stopPropagation(preventDefault(() => onEnd(value)))}
			style="
        left: {100 * toPercentage(value)}%;
				--background-color: {COLORS.ON_SURFACE_BUTTON};
				--border-color: {COLORS.ON_SURFACE_BACKGROUND};
      ">
		</div>
	</div>
</div>

<style>
	.container {
		width: 100%;
		height: 36px;
		padding-left: 18px;
		padding-right: 18px;
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
		border-radius: 12px;
	}
</style>
