/**
 * Prince Shop Theme Editor
 * Handles Shopify Theme Editor events and interactions
 */

(function() {
  'use strict';

  // Handle section load/unload events in the theme editor
  document.addEventListener('shopify:section:load', function(event) {
    console.log('Section loaded:', event.detail.sectionId);
  });

  document.addEventListener('shopify:section:unload', function(event) {
    console.log('Section unloaded:', event.detail.sectionId);
  });

  document.addEventListener('shopify:section:select', function(event) {
    console.log('Section selected:', event.detail.sectionId);
  });

  document.addEventListener('shopify:section:deselect', function(event) {
    console.log('Section deselected:', event.detail.sectionId);
  });

  document.addEventListener('shopify:block:select', function(event) {
    console.log('Block selected:', event.detail.blockId);
  });

  document.addEventListener('shopify:block:deselect', function(event) {
    console.log('Block deselected:', event.detail.blockId);
  });
})();
