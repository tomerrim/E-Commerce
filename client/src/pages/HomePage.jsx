import data from "../data";

export const HomePage = () => {
    return (
      <>
        <h1>Products</h1>
        <div className="products">
          {data.products.map((product) => (
            <div key={product.token} className="product">
              <img
                src={product.imageUrl}
                alt={product.name}
                width={500}
                height={600}
              />
              <p>{product.name}</p>
              <p>{product.price}$</p>
            </div>
          ))}
        </div>
      </>
    );
}