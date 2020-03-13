aws s3 cp .   s3://labs.coveodemo.com/multisite/ --recursive
aws cloudfront create-invalidation --distribution-id E255DU5L8IK1UZ --paths "/" "/*"