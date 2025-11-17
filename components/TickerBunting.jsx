"use client";

import TickerStripe from "./TickerStripe";

export default function TickerBunting() {
	return (
		<div className="relative w-full z-[2]">
			<TickerStripe
				absolute
				text="CUTE BEAUTIFUL SHINE LOVE"
				colorFill="#C85E71"
				colorText="#000000"
				opacityText={0.5}
				angle={-4}
				blendImage="/background-blend.png"
				// speed в пикселях/сек: быстрее → больше число
				speed={200}
				priorityImage
			/>

			<TickerStripe
				absolute
				text="DASHA HAPPY BIRTHDAY"
				colorFill="#FF92F4"
				colorText="#FFFFFF"
				opacityText={0.5}
				angle={5}
				blendImage="/background-blend.png"
				speed={200}
				priorityImage
			/>
		</div>
	);
}
