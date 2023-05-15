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
  nuevoNombre!: string;
  showInput = false;

  constructor(private authService: AuthenticationService, private storageService: StorageImagesService) {}

  ngOnInit() {
    this.displayName = this.authService.getCurrentName();
    this.email = this.authService.getCurrentEmail();
    this.photoURL = this.authService.getCurrentPhotoURL();
  }

  async editarNombre() {
    this.showInput = true;
  }

  async guardarNombre() {
    if (this.nuevoNombre !== null && this.nuevoNombre !== '') {
      await this.authService.updateName(this.nuevoNombre);
      this.displayName = this.nuevoNombre;
      this.nuevoNombre = '';
      this.showInput = false;
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
