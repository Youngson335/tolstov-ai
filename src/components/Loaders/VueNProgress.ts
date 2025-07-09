import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const VueNProgress = NProgress.configure({
  template: `
    <div class="bar" role="bar" style="background: ${'var(--base-border-color)'};">
      <div class="peg" style="box-shadow: 0 0 10px ${'var(--base-border-color)'}, 0 0 5px ${'var(--base-border-color)'};"></div>
    </div>
    <div class="spinner" role="spinner">
      <div class="spinner-icon" style="border-top-color: ${'var(--base-border-color)'}; border-left-color: ${'var(--base-border-color)'};"></div>
    </div>
  `
});

export default VueNProgress;