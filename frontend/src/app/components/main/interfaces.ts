export interface ImageResult {
    file: File;
    url: string;
    dataURL?: string;
    width?: number;
    height?: number;
    resized?: {
        dataURL: string;
        type: string;
    }
}