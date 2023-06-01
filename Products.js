import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const Dummy_products = [
  { id: "p1", price: 6, title: "book", description: "first book" },
  { id: "p2", price: 5, title: "ball", description: "to play cricket" },
];
const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {Dummy_products.map((item) => (
          <ProductItem
            key={item.id}
            id = {item.id}
            title={item.title}
            price={item.price}
            description={item.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
