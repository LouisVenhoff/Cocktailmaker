import { Page } from "./pages";


class PageLogic{

    public static setPage(page:Page)
    {
        switch(page){
            case Page.ORDER_PAGE:
                window.location.assign("/detail");
                break;
            case Page.SELECT_PAGE:
                window.location.assign("/");
                break;
        }
    }

}

export default PageLogic;