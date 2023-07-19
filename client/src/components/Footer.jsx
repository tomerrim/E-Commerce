export const Footer = () => {
    const year = new Date().getFullYear();
    return <footer className="text-center mb-1">© {year} - E-Commerce</footer>;
}