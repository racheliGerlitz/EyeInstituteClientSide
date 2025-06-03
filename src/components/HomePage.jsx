const HomePage = () => {
    return (
      <div style={{ position: 'relative', minHeight: '100vh', width: '100%' }}>
        {/* תמונה ברקע, מכסה את כל הדף כולל הסרגל */}
        <div
          style={{
            position: 'fixed', // שינוי מ-absolute ל-fixed
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            backgroundImage: "url('/images/healthy-vision-month-is-observed-every-year-may.jpg')",
            backgroundSize: 'contain', // אפשר גם 'cover'
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'top center',
            zIndex: -1, // כדי שיהיה מתחת לסרגל
          }}
        ></div>
      </div>
    );
  };
  
  export default HomePage;
  