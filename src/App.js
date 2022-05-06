import React/* , { useEffect, useState } */ from 'react'
// import { useRecoilValue } from 'recoil';
// import { stepState } from 'Store/GlobalStore';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { ClientPage } from 'Pages';

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

	// recoil
	// const step = useRecoilValue(stepState);

	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/admin" element={<ClientPage />} />
					<Route path="/master" element={<ClientPage />} />
					<Route path="/" element={<ClientPage />} />
				</Routes>
			</Router>


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
