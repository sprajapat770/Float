// core/theme/loadComponents.js
const components = import.meta.glob('../components/**/views/storefront/*.js', { eager: true });

const loadComponent = (componentName) => {
  const path = Object.keys(components).find(p => p.includes(componentName));
  return path ? components[path].default : () => <div>Component Not Found</div>;
};

export default loadComponent;
