import { lazy, Suspense, } from "react"
import { Route, Routes } from 'react-router-dom';

const MyAppBar = lazy(() => import("../layout/MyAppBar"))
const Home = lazy(() => import("../modules/home/index"))


const IndexRoute = () => {
    return (<Suspense fallback={<div>Loading...</div>}>
        <Routes>
            <Route path="/" element={<MyAppBar />}>
                <Route index element={<Home />} />
            </Route>

        </Routes>
    </Suspense >)
}

export default IndexRoute;