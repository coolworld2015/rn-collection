#import "RCTBridgeModule.h"
#import <AssetsLibrary/AssetsLibrary.h>
#import <UIKit/UIKit.h>
@interface ReadImageData : NSObject <RCTBridgeModule>
@end

@implementation ReadImageData

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(readImage:(NSString *)input callback:(RCTResponseSenderBlock)callback)
{
  
  // Create NSURL from uri
  NSURL *url = [[NSURL alloc] initWithString:input];
  
  // Create an ALAssetsLibrary instance. This provides access to the
  // videos and photos that are under the control of the Photos application.
  ALAssetsLibrary *library = [[ALAssetsLibrary alloc] init];
  
  // Using the ALAssetsLibrary instance and our NSURL object open the image.
  [library assetForURL:url resultBlock:^(ALAsset *asset) {
    
    // Create an ALAssetRepresentation object using our asset
    // and turn it into a bitmap using the CGImageRef opaque type.

//CGImageRef imageRef = [asset thumbnail];

    // Create UIImageJPEGRepresentation from CGImageRef


    ALAssetRepresentation *rep = [asset defaultRepresentation];
    CGImageRef iref = [rep fullResolutionImage];

    NSData *imageData = UIImageJPEGRepresentation([UIImage imageWithCGImage:iref], 1.0);

    // Convert to base64 encoded string
    NSString *base64Encoded = [imageData base64EncodedStringWithOptions:0];

    callback(@[base64Encoded]);

  } failureBlock:^(NSError *error) {
    NSLog(@"that didn't work %@", error);
  }];

//http://stackoverflow.com/questions/3837115/display-image-from-url-retrieved-from-alasset-in-iphone
  
}
@end
