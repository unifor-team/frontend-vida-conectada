import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageNotFound from "../pages/not-found";


interface RouterParams {
  MainPage: JSX.Element;
  pages: Pages[];
}

interface Pages {
  Page: JSX.Element;
  path: string;
}


export default function RouterComponent({ MainPage, pages }: RouterParams) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={MainPage}/>
        <Route path='*' element={<PageNotFound />} />
        {pages.map((page) => (<Route key={page.path} path={page.path} element={page.Page} />))}
      </Routes>
    </BrowserRouter>
  );
}
