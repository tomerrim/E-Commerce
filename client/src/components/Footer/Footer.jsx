import "./Footer.css";

export const Footer = () => {
    const year = new Date().getFullYear();
    return <footer>{`© ${year} - E-Commerce`}</footer>;
}