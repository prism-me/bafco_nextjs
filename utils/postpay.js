if (typeof window !== "undefined") {
  window.document.write(`
    <script type="text/javascript">
    window.postpayAsyncInit = function()
    {postpay.init({
      merchantId: "id_40ac05065d574a72b8485a6d521626b8",
      sandbox: true,
      theme: "light",
      locale: "en",
    })}
    </script>
    <script async src="https://cdn.postpay.io/v1/js/postpay.js"></script>
    `);
}
