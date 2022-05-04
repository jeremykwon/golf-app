import React/* , { useEffect, useState } */ from 'react'
import { useRecoilValue } from 'recoil';
import { stepState } from 'Store/GlobalStore';

import { Advertising } from 'Pages';

// import logo from './logo.svg';
// import { FullScreen, useFullScreenHandle } from "react-full-screen";

function App() {
	// const handle = useFullScreenHandle();

	// console.log(document.querySelector("#container"))
	// if (document.querySelector("#container")) document.querySelector("#container").requestFullscreen();
	// useEffect(() => {
	// 	console.log(document.querySelector("#container"))
	// 	if (document.querySelector("#container")) document.querySelector("#container").requestFullscreen();
	// 	// if (document.documentElement.requestFullscreen) document.querySelector("#container").requestFullscreen();
	// 	// else if (document.documentElement.webkitRequestFullScreen) document.querySelector("#container").webkitRequestFullScreen();
	// }, []);

	const step = useRecoilValue(stepState);

	console.log(step)

	return (
		<div className="App">
			{
				step === 'ad' &&
				<Advertising />
			}

			{/* <button id='idgogo' onClick={handle.enter}>
				Enter fullscreen
			</button>
			<FullScreen id="container" handle={handle}>
				Any fullscreen content here
			</FullScreen> */}
		</div>
	);
}

export default App;
