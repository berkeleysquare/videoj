#!/bin/bash

# Upload all JSON data files to R2 bucket under data/ folder
echo "Uploading JSON data files to R2 bucket..."

npx wrangler r2 object put coffeehouse-assets/data/collections.json --file=public/assets/data/collections.json
npx wrangler r2 object put coffeehouse-assets/data/coffeehouse.json --file=public/assets/data/coffeehouse.json
npx wrangler r2 object put coffeehouse-assets/data/bksq1.json --file=public/assets/data/bksq1.json
npx wrangler r2 object put coffeehouse-assets/data/bksq2.json --file=public/assets/data/bksq2.json
npx wrangler r2 object put coffeehouse-assets/data/errand.json --file=public/assets/data/errand.json
npx wrangler r2 object put coffeehouse-assets/data/halfwaygone.json --file=public/assets/data/halfwaygone.json
npx wrangler r2 object put coffeehouse-assets/data/jk_even.json --file=public/assets/data/jk_even.json

echo "Upload complete!"
echo ""
echo "Files are now accessible at:"
echo "https://yourdomain.com/media/data/collections.json"
echo "https://yourdomain.com/media/data/coffeehouse.json"
echo "etc..."
