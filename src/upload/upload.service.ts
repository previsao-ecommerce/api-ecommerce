import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class UploadService {
  private readonly s3Client = new S3Client({
    forcePathStyle: false,
    endpoint: 'https://nyc3.digitaloceanspaces.com',
    region: 'us-east-1',
    credentials: {
      accessKeyId: "DO0047GXWHVMY3ENZ4PV",
      secretAccessKey: "aOJtn06K9+pqD6o5KiY4PQN+DQlIebHy6l4zwoU3htg"
    },
  });
  constructor(private readonly configService: ConfigService) {}

  async upload(folderName: string, fileName: string, file: Buffer) {
    const key = `${folderName}/${new Date().getTime()}_${fileName}`;
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: 'portimages',
        Key: key,
        Body: file,
        ACL: 'public-read',
      }),
    );

    const imageUrl = `https://portimages.nyc3.cdn.digitaloceanspaces.com/${key}`;

    return {
      imageUrl,
      message: 'Upload bem-sucedido!',
    };
  }
}
