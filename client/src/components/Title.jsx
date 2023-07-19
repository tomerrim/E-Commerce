import { Helmet } from "react-helmet-async"
export const Title = ({title}) => {
    return (
        <Helmet>
            <title>{title}</title>
        </Helmet>
    )
}