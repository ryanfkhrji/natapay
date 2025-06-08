type ContainerProps = {
  children: React.ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="container mx-auto px-4 max-w-md border border-gray-100 shadow-sm">{children}</div>
  );
};

export default Container;