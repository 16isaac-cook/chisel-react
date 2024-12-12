import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

import Home from "src/screens/Home/Home";
import Quill from "src/screens/Quill/Quill";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/quill",
		element: <Quill />,
	},
]);

const Routes: React.FC = () => {
	return <RouterProvider router={router} />;
};

export default Routes;
