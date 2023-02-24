import { Modal, Button } from '@arco-design/web-vue';


function overallError(e: any) {
  console.log(e);
  // 埋点
}

// error catch
async function ErrorCatch(data: any): Promise<Boolean> {
  const code: number = data.status || data.code || 200
  const map = {
    200: () => false,
    404: () => {
      Modal.info({
        title: '',
        content: () => h('div', { class: 'info-modal-content' }, [
          h('span', { style: 'margin-bottom: 10px;' }, 'This is an info message'),
          h(Button, { size: 'mini', ff }, 'Open Nest Modal')
        ])
      });
      return true
    }
  }
  function ff() {
    console.log(111);
  }
  return Promise.resolve(map[code]())
}

export default overallError