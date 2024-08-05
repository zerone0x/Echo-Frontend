function NoResult({ content }: { content: string }) {
  return (
    <div className="m-auto flex h-screen w-full flex-col items-center justify-center gap-10 p-4">
      <p>{content}</p>
    </div>
  );
}

export default NoResult;
