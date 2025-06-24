import { useRef, useEffect } from 'react';

const FOCUSABLE_SELECTORS = [
  'a[href]',
  'area[href]',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'button:not([disabled])',
  'iframe',
  'object',
  'embed',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable]'
].join(', ');

function getFocusableElements(container) {
  if (!container) return [];
  return Array.from(container.querySelectorAll(FOCUSABLE_SELECTORS)).filter(
    el => el.offsetWidth > 0 || el.offsetHeight > 0 || el.getClientRects().length > 0
  );
}

function useTransitionFocusTrap({ containerRef, isActive, initialFocusRef, returnFocusRef }) {
  const previouslyFocusedRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let focusableElements = [];
    let firstElement = null;
    let lastElement = null;

    function handleKeyDown(e) {
      if (e.key !== 'Tab') return;
      focusableElements = getFocusableElements(container);
      if (focusableElements.length === 0) {
        e.preventDefault();
        return;
      }
      firstElement = focusableElements[0];
      lastElement = focusableElements[focusableElements.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === firstElement || document.activeElement === container) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }

    function handleFocusIn(e) {
      if (!isActive) return;
      if (!container.contains(e.target)) {
        focusableElements = getFocusableElements(container);
        const toFocus = initialFocusRef?.current || focusableElements[0] || container;
        toFocus.focus();
      }
    }

    if (isActive) {
      if (!container.hasAttribute('tabindex')) {
        container.setAttribute('tabindex', '-1');
      }
      previouslyFocusedRef.current = document.activeElement;
      const toFocus = initialFocusRef?.current || container;
      if (toFocus && typeof toFocus.focus === 'function') {
        toFocus.focus();
      }
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('focusin', handleFocusIn);
    }

    return () => {
      if (isActive) {
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('focusin', handleFocusIn);
        const toReturn = returnFocusRef?.current || previouslyFocusedRef.current;
        if (toReturn && typeof toReturn.focus === 'function') {
          toReturn.focus();
        }
      }
    };
  }, [isActive, containerRef, initialFocusRef, returnFocusRef]);
}

export default useTransitionFocusTrap;