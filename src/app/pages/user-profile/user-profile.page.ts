import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { StorageImagesService } from 'src/app/services/storage-images.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  displayName = '';
  email = '';
  photoURL = '';
  selectedImage: File | null = null;

  constructor(private authService: AuthenticationService, private storageService: StorageImagesService) {}

  ngOnInit() {
    this.displayName = this.authService.getCurrentName();
    this.email = this.authService.getCurrentEmail();
    this.photoURL = this.authService.getCurrentPhotoURL();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
    } else {
      this.selectedImage = null;
    }
  }

  async editarNombre() {
    const newName = prompt('Ingrese un nuevo nombre');
    if (newName !== null && newName !== '') {
      await this.authService.updateName(newName);
      this.displayName = newName;
    }
  }

  async editarFoto() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.addEventListener('change', async (event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        this.selectedImage = target.files[0];
        const url = await this.storageService.onFileUpload(this.selectedImage);
        await this.authService.updatePhotoURL(url);
        this.photoURL = url;
      }
    });
    input.click();
  }

}
