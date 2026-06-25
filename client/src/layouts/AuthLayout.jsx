const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen bg-[#09122C] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#13203D] border border-slate-800 rounded-3xl p-8">
        <h1 className="text-3xl font-bold text-white text-center">{title}</h1>

        <p className="text-slate-400 text-center mt-2 mb-8">{subtitle}</p>

        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
