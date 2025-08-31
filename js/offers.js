function showConfirmationModal() {
  modal.style.display = "flex";
}

  const modal = document.getElementById("confirmModal");
  const toast = document.getElementById("orderToast");
  const yesBtn = document.getElementById("confirmYes");
  const noBtn = document.getElementById("confirmNo");
  document.querySelectorAll(".buy-now-btn").forEach((button, index) => {
  button.addEventListener("click", function (e) {
    e.preventDefault();
    const userLoggedIn = localStorage.getItem("loggedInUser");
    if (!userLoggedIn) {
      localStorage.setItem("redirectAfterLogin", "offers");
      localStorage.setItem("pendingOfferIndex", index);     
      window.location.href = "login.html";
    
    } else {
      showConfirmationModal();
    }
  });
});

  yesBtn.addEventListener("click", () => {
    modal.style.display = "none";
    toast.style.display = "block";

    setTimeout(() => {
      toast.style.display = "none";
    }, 3000);
  });

  noBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("load", () => {
  const userLoggedIn = localStorage.getItem("loggedInUser");
  const pendingIndex = localStorage.getItem("pendingOfferIndex");
  if (userLoggedIn && pendingIndex !== null) {
    localStorage.removeItem("pendingOfferIndex");
    showConfirmationModal();
  }
});

document.querySelectorAll('.offer-timer').forEach(timer => {
    const countdownEl = timer.querySelector('.countdown');
    const endTime = new Date(timer.dataset.endDate).getTime();
    if (!countdownEl || !endTime) return;
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime - now;
      if (distance < 0) {
        clearInterval(interval);
        countdownEl.textContent = "Expired";
        return;
      }
      const d = Math.floor(distance / (1000 * 60 * 60 * 24));
      const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((distance % (1000 * 60)) / 1000);
      countdownEl.textContent = `${d}d ${h}h ${m}m ${s}s`;
  }, 1000);

});


