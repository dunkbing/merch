declare global {
  function Toastify(options: unknown): { showToast: () => void };
}

export const toast = {
  success: (message: string) => {
    globalThis
      .Toastify({
        text: message,
        gravity: "top",
        position: "center",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      })
      .showToast();
  },
  warn: (message: string) => {
    globalThis.Toastify({
      text: message,
      gravity: "top",
      position: "center",
      style: {
        background: "linear-gradient(to right, #ff5f6d, #ffc371)",
      },
    }).showToast();
  },
};
