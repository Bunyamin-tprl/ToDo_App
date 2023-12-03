document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('addTaskForm');
    const input = document.getElementById('txtTaskName');
    const btnDeleteAll = document.getElementById('btnDeleteAll');
    const taskList = document.getElementById('task-list');
  
    form.addEventListener('submit', addNewItem);
    taskList.addEventListener('click', handleTaskListClick);
    btnDeleteAll.addEventListener('click', deleteAllItems);
  
    function addNewItem(e) {
      e.preventDefault();
  
      if (input.value === '') {
        Swal.fire({
          icon: 'error',
          title: 'Hata!',
          text: 'Zorunlu Alanı Boş Bırakmayınız.',
        });
        return;
      }
  
      const li = document.createElement('li');
      li.className = 'list-group-item list-group-item-secondary';
      li.appendChild(document.createTextNode(input.value));
  
      const a = document.createElement('a');
      a.classList = 'delete-item float-right';
      a.innerHTML = `
        <i class="fa-regular fa-pen-to-square" id="update"></i>
        <i class="fa-regular fa-trash-can" id="sil"></i>
      `;
  
      li.appendChild(a);
      taskList.appendChild(li);
  
      input.value = '';
      toastr.success('Öğe başarıyla eklendi.', '', { positionClass: 'toast-top-left' });
    }
  
    function handleTaskListClick(e) {
      const target = e.target;
  
      if (target.classList.contains('fa-pen-to-square')) {
        const listItem = target.closest('li');
        const taskText = listItem.textContent.trim();
  
        const inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.value = taskText;
  
        listItem.replaceChild(inputElement, listItem.firstChild);
  
        inputElement.focus();
  
        inputElement.addEventListener('blur', () => {
          const updatedText = inputElement.value.trim();
  
          if (updatedText !== '') {
            listItem.firstChild.textContent = updatedText;
          }
  
          listItem.replaceChild(document.createTextNode(updatedText), inputElement);
          toastr.success('Öğe başarıyla güncellendi.', '', { positionClass: 'toast-top-left' });
        }
        );
      } else if (target.classList.contains('fa-trash-can')) {
        deleteItem(target.closest('li'));
      }
    }
  
    function deleteItem(taskElement) {
      Swal.fire({
        title: 'Seçili öğeyi silmek istediğinize emin misiniz?',
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: 'Evet, sil!',
        cancelButtonText: 'Hayır, vazgeç!',
      }).then((result) => {
        if (result.isConfirmed) {
          taskElement.remove();
  
          Swal.fire({
            icon: 'success',
            title: 'Başarılı!',
            text: 'Seçili öğe başarıyla silindi!',
          });
  
          toastr.error('Seçili öğe başarıyla silindi.', '', { positionClass: 'toast-top-left' });
        }
      });
    }
  
    function deleteAllItems(e) {
      Swal.fire({
        title: 'Tüm kayıtlı öğeleri silmek istediğinize emin misiniz?',
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: 'Evet, sil!',
        cancelButtonText: 'Hayır, vazgeç!',
      }).then((result) => {
        if (result.isConfirmed) {
          taskList.innerHTML = '';
  
          Swal.fire({
            icon: 'success',
            title: 'Başarılı!',
            text: 'Tüm öğeler başarıyla silindi!',
          });
  
          toastr.error('Tüm öğeler başarıyla silindi!', '', { positionClass: 'toast-top-left' });
        }
      });
  
      e.preventDefault();
    }
  });
  