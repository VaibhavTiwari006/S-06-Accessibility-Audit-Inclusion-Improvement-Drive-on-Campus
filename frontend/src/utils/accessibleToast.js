import { toast } from 'react-toastify';

export const triggerVisualAlert = (type) => {
  const isVisualAlertEnabled = localStorage.getItem('access_visualAlerts') === 'true';
  if (!isVisualAlertEnabled) return;

  const overlay = document.createElement('div');
  overlay.className = `fixed inset-0 pointer-events-none z-[9999] opacity-0 transition-opacity duration-300 animate-ping`;
  
  if (type === 'error') {
    overlay.classList.add('border-[12px]', 'border-red-500');
  } else if (type === 'success') {
    overlay.classList.add('border-[12px]', 'border-emerald-500');
  } else {
    overlay.classList.add('border-[12px]', 'border-primary');
  }

  document.body.appendChild(overlay);

  // Trigger animation
  setTimeout(() => overlay.classList.remove('opacity-0'), 10);
  
  // Clean up
  setTimeout(() => {
    overlay.classList.add('opacity-0');
    setTimeout(() => overlay.remove(), 300);
  }, 1000);
};

export const accessibleToast = {
  success: (msg, options) => {
    triggerVisualAlert('success');
    return toast.success(msg, options);
  },
  error: (msg, options) => {
    triggerVisualAlert('error');
    return toast.error(msg, options);
  },
  info: (msg, options) => {
    triggerVisualAlert('info');
    return toast.info(msg, options);
  }
};
