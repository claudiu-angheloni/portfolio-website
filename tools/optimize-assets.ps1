$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Drawing

$outDir = Join-Path $PSScriptRoot "..\\assets\\optimized"
if (!(Test-Path $outDir)) {
  New-Item -ItemType Directory -Path $outDir | Out-Null
}

function New-ResizedBitmap {
  param(
    [string]$SourcePath,
    [int]$Width,
    [int]$Height,
    [bool]$Grayscale = $false
  )

  $resolvedSource = Join-Path $PSScriptRoot "..\\$SourcePath"
  $sourceImage = [System.Drawing.Image]::FromFile($resolvedSource)

  try {
    $bitmap = New-Object System.Drawing.Bitmap $Width, $Height
    $bitmap.SetResolution(72, 72)

    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    try {
      $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
      $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
      $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
      $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

      if ($Grayscale) {
        $matrixElements = [single[][]]@(
          ([single[]](0.299, 0.299, 0.299, 0, 0)),
          ([single[]](0.587, 0.587, 0.587, 0, 0)),
          ([single[]](0.114, 0.114, 0.114, 0, 0)),
          ([single[]](0, 0, 0, 1, 0)),
          ([single[]](0, 0, 0, 0, 1))
        )
        $colorMatrix = New-Object System.Drawing.Imaging.ColorMatrix (, $matrixElements)
        $imageAttributes = New-Object System.Drawing.Imaging.ImageAttributes
        $imageAttributes.SetColorMatrix($colorMatrix)

        try {
          $destinationRect = New-Object System.Drawing.Rectangle 0, 0, $Width, $Height
          $graphics.DrawImage(
            $sourceImage,
            $destinationRect,
            0,
            0,
            $sourceImage.Width,
            $sourceImage.Height,
            [System.Drawing.GraphicsUnit]::Pixel,
            $imageAttributes
          )
        } finally {
          $imageAttributes.Dispose()
        }
      } else {
        $graphics.DrawImage($sourceImage, 0, 0, $Width, $Height)
      }
    } finally {
      $graphics.Dispose()
    }

    return $bitmap
  } finally {
    $sourceImage.Dispose()
  }
}

function Save-Jpeg {
  param(
    [System.Drawing.Bitmap]$Bitmap,
    [string]$DestinationPath,
    [long]$Quality = 88
  )

  $encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object {
    $_.MimeType -eq "image/jpeg"
  }

  $encoderParameters = New-Object System.Drawing.Imaging.EncoderParameters 1
  $encoderParameters.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter (
    [System.Drawing.Imaging.Encoder]::Quality
  ), $Quality

  try {
    $Bitmap.Save($DestinationPath, $encoder, $encoderParameters)
  } finally {
    $encoderParameters.Dispose()
    $Bitmap.Dispose()
  }
}

function Save-Png {
  param(
    [System.Drawing.Bitmap]$Bitmap,
    [string]$DestinationPath
  )

  try {
    $Bitmap.Save($DestinationPath, [System.Drawing.Imaging.ImageFormat]::Png)
  } finally {
    $Bitmap.Dispose()
  }
}

Save-Jpeg (New-ResizedBitmap -SourcePath "assets\\earth\\earth-textures\\Earth map.jpg" -Width 4096 -Height 2048 -Grayscale $true) (Join-Path $outDir "earth-day-gray-4k.jpg") 84
Save-Jpeg (New-ResizedBitmap -SourcePath "assets\\Srtm_ramp2.world.21600x10800.jpg" -Width 4096 -Height 2048) (Join-Path $outDir "earth-height-4k.jpg") 82
Save-Jpeg (New-ResizedBitmap -SourcePath "assets\\earth\\earth-textures\\Night.jpg" -Width 4096 -Height 2048 -Grayscale $true) (Join-Path $outDir "earth-night-gray-4k.jpg") 84
Save-Jpeg (New-ResizedBitmap -SourcePath "assets\\earth\\earth-textures\\Clouds.jpg" -Width 4096 -Height 2048 -Grayscale $true) (Join-Path $outDir "earth-clouds-gray-4k.jpg") 84
Save-Png (New-ResizedBitmap -SourcePath "assets\\earth\\earth-textures\\Clouds_Alpha.png" -Width 2048 -Height 1024) (Join-Path $outDir "earth-clouds-alpha-2k.png")
