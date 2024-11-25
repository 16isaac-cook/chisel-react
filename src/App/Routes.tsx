import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "src/screens/Home/Home";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
]);

const Routes: React.FC = () => {
	return <RouterProvider router={router} />;
};

export default Routes;
