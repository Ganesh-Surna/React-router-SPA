import classes from './ContentComponent.module.css';

function ContentComponent({ title, children }) {
  return (
    <div className={classes.content}>
      <h1>{title}</h1>
      {children}
    </div>
  );
}

export default ContentComponent;