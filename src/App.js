import React/* , { useEffect, useState } */ from 'react'

import { useRecoilValue } from 'recoil';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { alertState } from 'Store/GlobalStore'

import { 
	ClientPage, LoginPage, NotFoundPage, AdminPage, MasterPage,
	ClientPage2, AdminPage2
 } from 'Pages';
import { Alert } from 'Components';

function App() {
	const info = useRecoilValue(alertState);
	
	return (
		<div className="App">
			{
				info.isView && <Alert />
			}
			<Router>
				<Routes>
					<Route path="*" element={<NotFoundPage />} />
					<Route path="/admin" element={<AdminPage />} />
					<Route path="/master" element={<MasterPage />} />
					<Route path="/" element={<ClientPage />} />
					<Route path="/signin" element={<LoginPage />} />

					<Route path="/2" element={<ClientPage2 />} />
					<Route path="/3" element={<AdminPage2 />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
